interface TextComponentProps {
  text: string;
}

export default function TextComponent({ text }: TextComponentProps) {
  return <div className='text-white'>{text}</div>;
}
