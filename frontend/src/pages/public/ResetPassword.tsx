import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "@/hooks/use-auth";

import { Input } from "@/components/ui/input";
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

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPasswordOTP } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await resetPasswordOTP(values.password, location.state.resetToken);
      toast({
        description:
          "Senha redefinida com sucesso, você já pode acessar utilizando sua nova senha",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "Houve um problema ao tentar redefinir sua senha. Por favor, tente novamente.",
      });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm min-w-[24rem]">
        {/* CARD HEADER */}
        <CardHeader>
          <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
          <CardDescription>Insira e confirme sua nova senha!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>

                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confime sua senha</FormLabel>

                    <FormControl>
                      <Input
                        id="passwordConfirmation"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CustomButton
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
              >
                Salvar nova senha
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

export default ResetPassword;
