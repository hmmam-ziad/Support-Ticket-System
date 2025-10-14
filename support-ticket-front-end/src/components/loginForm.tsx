"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { loginFormValues, loginSchema } from "@/schema/loginSchema"
import { loginAction } from "@/serverActions/auth.actions"



export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false); 
  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      const res = await loginAction(data);
      if (res.success) {
        window.location.href = "/user/dashboard";
      }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-sm sm:text-base">
            Sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    UserName
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Insert your username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Insert your password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <CardFooter>
            <Field orientation="vertical" className="justify-center mt-2.5">
            {isLoading ? (
                <Button disabled type="button" variant="outline" size={"sm"}>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" form="form-rhf-demo">
                  Sign in
                </Button>
              )
            }
            <Button asChild type="button" variant="outline" size={"sm"}>
                <Link href="/auth/register">Don't have an account? Sign up</Link>
            </Button>
            </Field>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
