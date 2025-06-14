import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useCreateQrCode } from "./hook/useCreateQrcode";
import { willQRCodeHaveContrastProblem } from "@/utils/QRCodeHaveContrastProblem";

const CreateQrCodePage: React.FC = () => {
  const {
    actions: { changeQrCodeState },
    states: { qrCodeState },
  } = useCreateQrCode();

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row justify-center items-start gap-8">
      {/* Seção Esquerda */}
      <div className="w-full lg:w-1/2  rounded-lg shadow-md p-3">
        <h2 className="text-xl font-semibold mb-6">
          1. Crie um código QR para um site ou URL
        </h2>

        <div className="flex items-center border rounded-md p-2 mb-4 ">
          <Globe className="h-5 w-5 text-gray-500 mr-2" />
          <Input
            className="border-none focus-visible:ring-0 shadow-none p-0 h-auto"
            type="text"
            placeholder="https://google.com"
            onChange={(e) =>
              changeQrCodeState({
                url: e.target.value,
              })
            }
          />
        </div>

        <h2 className="text-xl font-semibold mb-6">2. Configure seu estilo</h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          {/* Outras seções do acordeão */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg py-4 border-b">
              Tamanho
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <Input
                type="range"
                step={1}
                min={250}
                max={450}
                value={qrCodeState.size}
                onChange={(e) =>
                  changeQrCodeState({
                    size: Number(e.target.value),
                  })
                }
              />
              <p className="text-gray-600">{qrCodeState.size}px</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg py-4 border-b">
              Logo
            </AccordionTrigger>
            <AccordionContent>
              {/* Conteúdo para a seção Logo */}
              <p className="text-gray-600">Add a logo to your QR code.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg py-4">Cores</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">Cor de fundo</p>
              <div className="flex">
                <Input
                  className="w-[50px]"
                  type="color"
                  value={qrCodeState.bgColor}
                  onChange={(e) =>
                    changeQrCodeState({
                      bgColor: e.target.value,
                    })
                  }
                />
                <div className="flex items-center border rounded-md p-2 mb-4 ">
                  <Input
                    className="border-none focus-visible:ring-0 shadow-none p-0 h-auto"
                    type="text"
                    value={qrCodeState.bgColor}
                    onChange={(e) => {
                      const typedColor = e.target.value;
                      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(typedColor)) {
                        changeQrCodeState({
                          bgColor: typedColor,
                        });
                      } else {
                        changeQrCodeState({
                          bgColor: "#FFFFFF",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <p className="text-gray-600">Cor de primeiro plano</p>
              <div className="flex">
                <Input
                  className="w-[50px]"
                  type="color"
                  value={qrCodeState.fgColor}
                  onChange={(e) =>
                    changeQrCodeState({
                      fgColor: e.target.value,
                    })
                  }
                />
                <div className="flex items-center border rounded-md p-2 mb-4 ">
                  <Input
                    className="border-none focus-visible:ring-0 shadow-none p-0 h-auto"
                    type="text"
                    value={qrCodeState.fgColor}
                    onChange={(e) => {
                      const typedColor = e.target.value;
                      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(typedColor)) {
                        changeQrCodeState({
                          fgColor: typedColor,
                        });
                      } else {
                        changeQrCodeState({
                          fgColor: "#FFFFFF",
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Seção Direita - Preview do QR Code */}
      <div className="w-full lg:w-1/3 flex flex-col items-center gap-8">
        <Card className="p-4 bg-white rounded-lg shadow-md flex justify-center items-center">
          <QRCodeSVG
            level={"H"}
            value={qrCodeState.url}
            height={qrCodeState.size}
            width={qrCodeState.size}
            bgColor={qrCodeState.bgColor}
            fgColor={qrCodeState.fgColor}
          />
        </Card>
        {willQRCodeHaveContrastProblem(
          qrCodeState.fgColor,
          qrCodeState.bgColor ?? "",
          2.4
        ) && (
          <div className="bg-red-400 p-3 rounded-lg">
            <p className="text-white">
              Este QR pode não ser reconhecido por alguns dispositivos, tente
              alterar as configurações de cores
            </p>
          </div>
        )}

        <Button className="w-full  text-lg py-3 rounded-md">
          3. Download QR code
        </Button>
      </div>
    </div>
  );
};

export { CreateQrCodePage };
