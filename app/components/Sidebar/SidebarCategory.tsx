import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { SidebarLinkProps } from "./SidebarLink";
import SidebarLink from "./SidebarLink";

export interface SidebarCategoryProps {
  label: string;
  // Only 1 layer deep, no additional nesting
  links: SidebarLinkProps[];
}

export function isCategory(
  item: SidebarCategoryProps | SidebarLinkProps
): item is SidebarCategoryProps {
  return "links" in item;
}

export default function SidebarCategory({
  label,
  links,
}: SidebarCategoryProps) {
  return (
    <Box>
      <Accordion allowToggle defaultIndex={0}>
        <AccordionItem border="none">
          {/** category label or link */}
          <Box marginBottom={1}>
            <AccordionButton padding={0}>
              <HStack
                w="full"
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.800"),
                }}
                transition="background-color 0.1s ease"
                paddingY="1"
                paddingX="3"
                margin={0}
                borderRadius="md"
              >
                <Text>{label}</Text>
                <Spacer />
                <AccordionIcon />
              </HStack>
            </AccordionButton>
          </Box>
          {/** category links */}
          <AccordionPanel padding="0">
            <Box
              marginLeft={4}
              paddingLeft={4}
              borderLeft="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
            >
              {links.map((link) => (
                <Box key={link.href} marginTop="2">
                  <SidebarLink href={link.href} label={link.label} />
                </Box>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
