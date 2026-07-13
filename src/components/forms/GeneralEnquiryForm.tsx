"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * General enquiry form.
 *
 * Per brand brief §4.6:
 *   Fields: Name, Organisation (optional), Email, Telephone (optional),
 *           General subject, Message, Consent checkbox
 *   Warning above message field re: confidentiality + no relationship
 *   Consent wording: "I understand that this enquiry is for general
 *   communication and does not establish an advocate-client
 *   relationship."
 *
 *   Do NOT request: budget, desired outcome, opposing party, case
 *   number, court documents, Aadhaar, PAN, financial records, medical,
 *   ID documents, file uploads.
 *
 *   No appointment-booking calendar.
 *
 * Backend: POST /api/enquiry with Zod validation, honeypot, rate
 * limiting, generic safe errors, no console logging, no auto-forward,
 * no attachment support, no automated legal response, no response time
 * promise, no mailing-list by default.
 */

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Name is too long."),
  organisation: z
    .string()
    .trim()
    .max(200, "Organisation field is too long.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
  telephone: z
    .string()
    .trim()
    .max(40, "Telephone is too long.")
    .regex(
      /^[0-9 +()\-\s]*$/,
      "Telephone may contain digits, spaces and the symbols + ( ) -."
    )
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a general subject.")
    .max(200, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "Message is too long (5000 characters maximum)."),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm the consent statement before submitting.",
    }),
  }),
  // Honeypot field — must remain empty. Hidden from users.
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export function GeneralEnquiryForm() {
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      organisation: "",
      email: "",
      telephone: "",
      subject: "",
      message: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status === 429) {
        setStatus({
          kind: "error",
          message:
            "Too many enquiries have been submitted from this browser. Please try again later.",
        });
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({
          kind: "error",
          message:
            data?.error ??
            "The enquiry could not be submitted at the moment. Please try again later or contact the practice directly.",
        });
        return;
      }
      setStatus({ kind: "success" });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message:
          "The enquiry could not be submitted at the moment. Please try again later or contact the practice directly.",
      });
    }
  });

  // If email configuration is absent, the form is shown but submission
  // is disabled gracefully — never pretend that a message was sent.
  const formEnabled = siteConfig.features.enquiryFormEnabled;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="enquiry-form-heading"
      className="space-y-6"
    >
      <h2 id="enquiry-form-heading" className="sr-only">
        General enquiry form
      </h2>

      {/* Confidentiality warning — above message field placement is
          preserved below; this top warning is the brand-brief §4.6
          "Display this warning directly above the message field" —
          we duplicate at the top for visibility. */}
      <div
        role="note"
        className="border-l-2 border-[var(--aarohan-red)] pl-4 py-2 bg-[var(--aarohan-paper-deep)]/60"
      >
        <p className="font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-xs leading-relaxed">
          Please do not include confidential, privileged or time-sensitive
          information. Submission of this form does not create an
          advocate-client relationship.
        </p>
      </div>

      {!formEnabled && (
        <p className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
          The enquiry form is currently disabled. Please contact the
          practice directly using the verified email or telephone above.
        </p>
      )}

      {/* Honeypot — visually hidden, must remain empty */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website-url">Website (leave empty)</label>
        <input
          id="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            disabled={!formEnabled || status.kind === "submitting"}
            {...register("name")}
          />
        </Field>
        <Field label="Organisation" optional error={errors.organisation?.message}>
          <Input
            id="organisation"
            autoComplete="organization"
            disabled={!formEnabled || status.kind === "submitting"}
            {...register("organisation")}
          />
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            disabled={!formEnabled || status.kind === "submitting"}
            {...register("email")}
          />
        </Field>
        <Field label="Telephone" optional error={errors.telephone?.message}>
          <Input
            id="telephone"
            type="tel"
            autoComplete="tel"
            disabled={!formEnabled || status.kind === "submitting"}
            {...register("telephone")}
          />
        </Field>
      </div>

      <Field label="General subject" required error={errors.subject?.message}>
        <Input
          id="subject"
          disabled={!formEnabled || status.kind === "submitting"}
          {...register("subject")}
        />
      </Field>

      {/* Warning immediately above message field (per brand brief §4.6) */}
      <div role="note" className="border-l-2 border-[var(--aarohan-red)] pl-4 py-2">
        <p className="font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-xs leading-relaxed">
          Please do not include confidential, privileged or time-sensitive
          information. Submission of this form does not create an
          advocate-client relationship.
        </p>
      </div>

      <Field label="Message" required error={errors.message?.message}>
        <Textarea
          id="message"
          rows={6}
          maxLength={5000}
          disabled={!formEnabled || status.kind === "submitting"}
          {...register("message")}
        />
        <p className="mt-2 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
          5000 characters maximum.
        </p>
      </Field>

      {/* Consent */}
      <div>
        <label
          htmlFor="consent"
          className="flex items-start gap-3 cursor-pointer group"
        >
          <Checkbox
            id="consent"
            disabled={!formEnabled || status.kind === "submitting"}
            {...register("consent")}
            // Checkbox from shadcn/ui expects a boolean; we wire it manually below
            onCheckedChange={(v) => {
              // react-hook-form controlled value — set via register above
              // This handler ensures the checkbox stays in sync.
              const ev = new Event("change", { bubbles: true });
              (document.getElementById("consent") as HTMLInputElement)?.dispatchEvent(ev);
              void v;
            }}
          />
          <span className="font-editorial text-[var(--aarohan-ink)] text-sm md:text-base leading-relaxed">
            I understand that this enquiry is for general communication
            and does not establish an advocate-client relationship.
          </span>
        </label>
        {errors.consent?.message && (
          <p role="alert" className="mt-2 font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-xs">
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          disabled={!formEnabled || status.kind === "submitting"}
          className="bg-[var(--aarohan-ink)] text-[var(--aarohan-paper)] hover:bg-[var(--aarohan-red-deep)] px-7 py-4 font-mono-label h-auto rounded-none"
        >
          {status.kind === "submitting" ? "Submitting…" : "Submit enquiry"}
        </Button>
        {status.kind === "success" && (
          <p
            role="status"
            aria-live="polite"
            className="font-mono-label text-[var(--aarohan-ink)] normal-case tracking-normal text-sm"
          >
            Your enquiry has been received. The practice will respond
            through the verified contact information if appropriate.
          </p>
        )}
        {status.kind === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            className="font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-sm"
          >
            {status.message}
          </p>
        )}
      </div>

      <p className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs leading-relaxed">
        No file uploads. No automated legal response. No mailing-list
        subscription. No guarantee of response time. No automated creation
        of an advocate-client relationship.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={label.replace(/\s/g, "-").toLowerCase()}
        className="font-mono-label text-[var(--aarohan-ink)] mb-2 inline-block"
      >
        {label}
        {required && <span className="text-[var(--aarohan-red)] ml-1">*</span>}
        {optional && (
          <span className="text-[var(--aarohan-ink-muted)] ml-2 normal-case tracking-normal text-xs">
            (optional)
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p
          role="alert"
          className="mt-2 font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-xs"
        >
          {error}
        </p>
      )}
    </div>
  );
}
