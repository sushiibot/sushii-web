import type { PropsOf } from "@chakra-ui/react";
import { chakra, useColorModeValue, Flex } from "@chakra-ui/react";
import { Link, useMatches } from "@remix-run/react";
import type { Ref } from "react";
import { forwardRef, useEffect, useRef } from "react";

const StyledLink = forwardRef(function StyledLink(
  props: PropsOf<typeof chakra.a> & {
    isActive?: boolean;
    isExternal?: boolean;
  },
  ref: Ref<any>
) {
  const { isActive, isExternal = false, ...rest } = props;

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      aria-current={isActive ? "page" : undefined}
      width="100%"
      px="3"
      py="1"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color="fg"
      transition="all 0.2s"
      _activeLink={{
        bg: useColorModeValue("teal.50", "rgba(48, 140, 122, 0.3)"),
        color: "accent-emphasis",
        fontWeight: "600",
      }}
      {...rest}
    />
  );
});

type SidebarLinkProps = PropsOf<typeof chakra.div> & {
  href?: string;
  icon?: React.ReactElement;
  isExternal?: boolean;
};

function checkHref(href: string, slug: string | string[]) {
  const _slug = Array.isArray(slug) ? slug : [slug];
  const path = href.split("/");
  const pathSlug = path[path.length - 1];
  return _slug.includes(pathSlug);
}

const SidebarLink = ({
  href,
  children,
  isExternal = false,
  ...rest
}: SidebarLinkProps) => {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  const isActive = checkHref(href, router.query.slug) || href === router.asPath;

  const link = useRef<HTMLAnchorElement>();

  useEffect(() => {
    if (isActive && router.query.scroll === "true") {
      link.current.scrollIntoView({ block: "center" });
    }
  }, [isActive, router.query]);

  return (
    <Flex align="center" userSelect="none" lineHeight="tall" {...rest}>
      <Link to={href}>
        <StyledLink isActive={isActive} ref={link} isExternal={isExternal}>
          {children}
        </StyledLink>
      </Link>
    </Flex>
  );
};

export default SidebarLink;