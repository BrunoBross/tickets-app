import { AuthContextInterface } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";

import "./login.css";
import {
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowSquareOut, Eye, EyeClosed, WhatsappLogo } from "phosphor-react";

interface LoginProps {
  auth: AuthContextInterface;
}

export default function Login(props: LoginProps) {
  const {
    auth: { Login, error, setError },
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: `${error}`,
        position: "bottom-right",
        isClosable: true,
        variant: "left-accent",
        status: "error",
      });
      setError(null);
    }
  }, [error]);

  const handleOrganizerLogin = async () => {
    if (!email || !password) {
      return toast({
        title: "Preencha todos os campos",
        position: "bottom-right",
        isClosable: true,
        variant: "left-accent",
        status: "error",
      });
    }

    if (password.length < 8) {
      return toast({
        title: "A senha deve possuir no minimo 8 caracteres",
        position: "bottom-right",
        isClosable: true,
        variant: "left-accent",
        status: "error",
      });
    }
    await Login({ email, password, isRemember });
  };

  return (
    <div className="background" style={{ overflow: "hidden" }}>
      <div className="container animate__animated animate__fadeInDown">
        <div className="left-box" />
        <div className="right-box">
          <Container
            display="flex"
            flexDirection="column"
            gap="1rem"
            maxW="70%"
            alignItems="center"
            id="form-container"
          >
            <Heading>Tickets</Heading>

            {/* EMAIL */}
            <InputGroup>
              <Input
                pr="4.5rem"
                type="email"
                borderColor="blue.500"
                borderWidth="2px"
                size="lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            {/* PASSWORD */}
            <InputGroup>
              <Input
                pr="4.5rem"
                type={isShowPassword ? "text" : "password"}
                borderColor="blue.400"
                borderWidth="2px"
                size="lg"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement top="1" right="1">
                <Button
                  p="0"
                  backgroundColor="transparent"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* EXTRA OPTIONS */}
            <InputGroup justifyContent="space-between" id="extra-options">
              <Checkbox
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              >
                Lembrar de mim
              </Checkbox>
              <Link
                onClick={() => alert("Alterar senha")}
                isExternal
                display="flex"
                gap="0.5rem"
              >
                Esqueci minha senha <ArrowSquareOut size={20} />
              </Link>
            </InputGroup>

            {/* SUBMIT */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
              onClick={handleOrganizerLogin}
            >
              Entrar
            </Button>

            <Text
              fontSize="md"
              display="flex"
              gap="0.5rem"
              textAlign="center"
              id="contact-link"
            >
              Gostaria de anunciar seus eventos?{" "}
              <Link
                href="https://api.whatsapp.com/send?phone=5548988470773&text=Ol%C3%A1,%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20cria%C3%A7%C3%A3o%20de%20eventos"
                isExternal
                display="flex"
                alignItems="center"
                gap="0.5rem"
                textDecoration="underline"
              >
                Entrar em contato <WhatsappLogo size={20} />
              </Link>
            </Text>
          </Container>
        </div>
      </div>
    </div>
  );
}
