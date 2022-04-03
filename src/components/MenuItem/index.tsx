import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "./styles";

interface IProps {
  label?: string;
  isActive?: boolean;
  href?: string;
  icon?: {
    component: React.ReactElement<any> | any;
  };
}

const MenuItem: NextPage<IProps> = ({
  label,
  icon,
  href = "#",
  isActive = false,
}) => {
  return (
    <Link href={href}>
      <a>
        <Container isActive={isActive}>
          {icon && <icon.component />}
          <p>{label}</p>
        </Container>
      </a>
    </Link>
  );
};

export default MenuItem;
