import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useHTTPContext } from "./contexts/HTTPContext";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import User from "@/types/User";

interface ILoginProps {
  setUser: (user: User) => void;
  isCreate?: boolean;
}

const Login: React.FC<ILoginProps> = ({ setUser, isCreate }) => {
  const http = useHTTPContext();

  const [gotUser, setGotUser] = useState(false);

  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Need to wait for react to actually set the user
    // because useState is asynchronous
    if (gotUser)
      navigate("/chooseBudget");
  }, [gotUser]);

  const loginOnClick = useCallback(() => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (email === "" || password === "") {
      console.error("Email and password must not be empty");
      return;
    }

    http.post("/api/login", {
      email: email,
      password: password
    }).then(response => {
      if (response.status !== 200) {
        console.error("Failed to login");
        return;
      }
      setUser(new User(response.data));
      setGotUser(true);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const createOnClick = useCallback(() => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const confirmPassword = confirmPasswordRef.current!.value;

    if (email === "" || password === "") {
      console.error("Email and password must not be empty");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    http.post("/api/register", {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    }).then(response => {
      if (response.status !== 201) {
        console.error("Failed to create account");
        return;
      }
      setUser(response.data);
      setGotUser(true);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  const navigate = useNavigate();

  const title = isCreate ? "Create Account" : "Login";

  {/* ECP TODO: USE THE FORM COMPONENT FOR SHADCN INTSTEAD OF STANDARD HTML FORM */}
  return (
    <div className="h-full flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col w-full items-center gap-4" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <Label htmlFor={emailId}>Email</Label>
              <Input id={emailId} type="email" size={33} className="text-center" ref={emailRef}/>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={passwordId}>Password</Label>
              <Input id={passwordId} type="password" size={33} className="text-center" ref={passwordRef} />
            </div>
            {
              isCreate && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={confirmPasswordId}>Confirm Password</Label>
                  <Input id={confirmPasswordId} type="password" size={33} className="text-center" ref={confirmPasswordRef} />
                </div>
              )
            }
            <div className="flex w-full items-center justify-center">
              <Button className="w-1/3 min-w-fit" onClick={isCreate ? createOnClick : loginOnClick}>{title}</Button>
            </div>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="pt-4">
          <div className="flex flex-col w-full items-end">
            {isCreate ? <Link to="/login" className="text-blue-500">Login</Link> : <Link to="/register" className="text-blue-500">Register</Link>}
            {/* <Link to="/forgot" className="text-blue-500">Forgot password?</Link> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login;
