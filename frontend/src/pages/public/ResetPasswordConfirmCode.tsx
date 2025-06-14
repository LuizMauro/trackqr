import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "@/hooks/use-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomButton } from "@/components/custom-button";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Digite todos os 6 números do código enviado" }),
});

function ResetPasswordConfirmCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { verifyCodeOTP } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const data = await verifyCodeOTP(values.otp, location.state?.email);

      if (!data?.resetToken) {
        throw new Error("Invalid reset token");
      }

      toast({
        description: `Código validado com sucesso, você já pode redeifir sua senha`,
      });

      navigate("/reset-password", { state: { resetToken: data.resetToken } });
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description:
          "Falha ao validar código. Por favor, verifique o código informado.",
      });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm min-w-sm">
        {/* CARD HEADER */}
        <CardHeader>
          <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
          <CardDescription>
            Confirme o código enviado para seu email{" "}
            <b>{location.state?.email}</b>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digite o código de segurança</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CustomButton
                type="submit"
                className="w-full"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                isLoading={form.formState.isSubmitting}
              >
                Validar
              </CustomButton>

              <div className="mt-4 text-center text-sm">
                <Link to="/login" className="underline">
                  Voltar para login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPasswordConfirmCode;
