// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      DarkGrey: string;
      LightGrey: string;
      Rose: string;
      Green: string;
      Lavender: string;
      Black: string;
      Grey: string;
      Orange: string;
      DarkBlue: string;
      backgroundColor: string;
      FontColor: string;
    };
  }
}
