import React, { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Eye,
  QrCode,
  Link,
  CornerDownRight,
  ArrowRight,
} from "lucide-react";
import api from "@/http/api";
import { QRCodeCanvas } from "qrcode.react";

interface IQrCode {
  id: string;
  slug: string;
  targetUrl: string;
  title: string;
  style: {
    fgColor?: string;
    bgColor?: string;
    logoUrl?: string;
  } | null;
  trackings: any[];
  createdBy: string | null;
  createdAt: string;
}

function downloadStringAsFile(data: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();
}

const ListQrCodePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeDownload, setQrCodeDownload] = useState<IQrCode | null>(null);
  const [qrCodes, setQrCodes] = useState<IQrCode[]>([]);

  const getQrCodes = async () => {
    try {
      const { data } = await api.get<IQrCode[]>("/qr");
      console.log(data);
      setQrCodes(data);
    } catch (error) {
      console.warn(error);
    }
  };

  function onCanvasButtonClick() {
    const node = canvasRef.current;
    if (node == null) {
      return;
    }
    const dataURI = node.toDataURL("image/png");

    downloadStringAsFile(dataURI, "qrcode-canvas.png");
  }

  const removeHttps = (url: string) => {
    return url.split("https://www.")[1];
  };

  useEffect(() => {
    if (qrCodeDownload !== null) {
      onCanvasButtonClick();
    }
  }, [qrCodeDownload]);

  useEffect(() => {
    getQrCodes();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        {qrCodes.map((qr) => (
          <Card
            key={qr.id}
            className="flex flex-col md:flex-row justify-between p-4 gap-6 items-start"
          >
            {/* Coluna da Esquerda */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <QrCode className="w-4 h-4" />
                {qr.title}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground break-all">
                <Link className="w-4 h-4" />
                <span className="text-foreground">{`qrtrack.com/${qr.slug}`}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground break-all">
                <CornerDownRight className="w-4 h-4" />
                <span>{removeHttps(qr.targetUrl)}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-foreground font-medium">
                    {qr?.trackings?.length ?? 0}
                  </span>{" "}
                  scans
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(qr.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Button className="text-white gap-1 flex align-bottom justify-center">
                Detalhes <ArrowRight size={"16"} />
              </Button>
            </div>

            {/* Coluna da Direita */}
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
              <div className="p-1 bg-white rounded-lg">
                <QRCodeCanvas
                  level={"H"}
                  value={qr.slug}
                  size={120}
                  bgColor={qr?.style?.bgColor ?? "#fff"}
                  fgColor={qr?.style?.fgColor ?? "#000"}
                />
              </div>

              <Button
                variant="outline"
                size="lg"
                className="bg-primary text-white"
                onClick={() => setQrCodeDownload(qr)}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {qrCodeDownload !== null && (
        <QRCodeCanvas
          style={{ position: "absolute", right: 2000, bottom: 2000 }}
          ref={canvasRef}
          level={"H"}
          value={qrCodeDownload.slug}
          size={500}
          bgColor={qrCodeDownload?.style?.bgColor ?? "#fff"}
          fgColor={qrCodeDownload?.style?.fgColor ?? "#000"}
        />
      )}
    </div>
  );
};

export { ListQrCodePage };
