"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Award, Download, Loader2, Share2 } from "lucide-react";

interface Certificate {
  _id: string;
  courseTitle: string;
  issuedAt: string;
  certificateUrl?: string;
}

export default function CertificatesPage() {
  useSession();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/student/certificates");
      if (response.ok) {
        const data = await response.json();
        setCertificates(data.certificates || []);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading certificates...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Achievements</p>
        <h1 className="arch-heading-md">My Certificates</h1>
        <p className="text-muted-foreground mt-2">
          {certificates.length} {certificates.length === 1 ? "certificate" : "certificates"} earned.
        </p>
      </section>

      {certificates.length === 0 ? (
        <section className="arch-panel p-10 text-center">
          <Award className="h-10 w-10 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">No certificates yet. Complete courses to earn them.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {certificates.map((certificate) => (
            <article key={certificate._id} className="arch-panel overflow-hidden">
              <div className="h-36 bg-muted flex items-center justify-center">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-1">{certificate.courseTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button className="arch-button flex-1">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="arch-button-secondary">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
