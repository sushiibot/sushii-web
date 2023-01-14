import type { LayoutProps } from "@chakra-ui/react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import type { IconType } from "react-icons/lib";

interface TextCardProps extends LayoutProps {
  title: string;
  description: string;
  icon: IconType;
}

export default function TextCard({
  title,
  description,
  ...props
}: TextCardProps) {
  const { icon, ...layoutProps } = props;

  return (
    <Card
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      boxShadow={useColorModeValue("md", "2xl")}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      {...layoutProps}
    >
      <CardHeader paddingX={2} paddingY={0} marginBottom="1">
        <Box marginBottom="4">
          <props.icon size={36} />
        </Box>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody paddingX={2} paddingY={0}>
        <Text>{description}</Text>
      </CardBody>
    </Card>
  );
}
