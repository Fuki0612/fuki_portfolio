import { PlayfairDisplayFont } from "@/app/font"

const Title:React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-8`}>{title}</h2>
  )
}

export default Title