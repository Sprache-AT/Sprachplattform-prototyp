interface TextComponentProps {
  text: string;
}

export default function TextComponent({ text }: TextComponentProps) {
  return <div>{text}</div>;
}
