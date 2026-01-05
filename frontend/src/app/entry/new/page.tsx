"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

type UploadResponse = {
  cids: string[];
};

type EntryPayload = {
  text: string;
  images: string[];
};

const MAX_FREE_IMAGES = 3;

export default function NewEntryPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const availableFreeUploads = Math.max(
    0,
    MAX_FREE_IMAGES - user.freeImageUploadsUsed,
  );

  const usagePercent = useMemo(() => {
    return Math.min(
      100,
      Math.round((user.freeImageUploadsUsed / MAX_FREE_IMAGES) * 100),
    );
  }, [user.freeImageUploadsUsed]);

  const onSelectFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming);
    const limited = user.premium ? next : next.slice(0, availableFreeUploads);
    if (!user.premium && next.length > availableFreeUploads) {
      toast.error("Image limit reached. Upgrade to premium for more uploads.");
    }
    previews.forEach((preview) => URL.revokeObjectURL(preview));
    setFiles(limited);
    setPreviews(limited.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Write something before saving.");
      return;
    }

    setSubmitting(true);

    try {
      let cids: string[] = [];
      if (files.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        const upload = await apiFetch<UploadResponse>("/uploads", {
          method: "POST",
          body: formData,
        });
        cids = upload.cids;
      }

      const payload: EntryPayload = {
        text,
        images: cids,
      };

      await apiFetch("/entries", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success("Entry saved. See you tomorrow.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save your entry",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen px-6 pb-16 pt-8 sm:px-10">
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header>
            <h1 className="font-accent text-3xl sm:text-4xl">
              Write today’s entry
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your words are saved through the backend — no wallet prompts needed.
            </p>
          </header>

          <Card className="border border-border/60 bg-white/80 p-6">
            <div className="flex flex-col gap-5">
              <Textarea
                placeholder="Share something honest and simple..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="min-h-[180px] text-base leading-7"
              />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Image uploads</span>
                  <span>
                    {user.premium
                      ? "Unlimited"
                      : `${availableFreeUploads} free left`}
                  </span>
                </div>
                {!user.premium ? (
                  <Progress className="h-2" value={usagePercent} />
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Attach images (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => onSelectFiles(event.target.files)}
                />
                {previews.length ? (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {previews.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt="Preview"
                        className="h-24 w-32 flex-none rounded-xl object-cover"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              className="h-11 rounded-full px-6"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save entry"}
            </Button>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
