import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./menu";
import { LuGlobe } from "react-icons/lu";

import { HStack, IconButton, Text } from "@chakra-ui/react";
import { langs } from "src/i18n";
import { useTranslation } from "react-i18next";
import appStore from "@stores/appStore";
import { useColorModeValue } from "./color-mode";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLocale = appStore((state) => state.changeLocale);
  const bgColor = useColorModeValue("blue.100", "gray.800");

  function handleChangeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    changeLocale(lang);
  }
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          css={{
            _icon: {
              width: "5",
              height: "5",
            },
          }}
        >
          <LuGlobe />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {Object.keys(langs).map((lang) => (
          <MenuItem
            key={lang}
            value={lang}
            onClick={() => handleChangeLanguage(lang)}
            bg={i18n.resolvedLanguage === lang ? bgColor : "transparent"}
            cursor="pointer"
          >
            <HStack>
              <ReactCountryFlag countryCode={langs[lang].flag} svg />
              <Text>{langs[lang].nativeName}</Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}
