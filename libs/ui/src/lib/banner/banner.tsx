export interface BannerProps {
  text: string
}

export function Banner(props: BannerProps) {
  return <header className="bg-yellow-500 p-2">{`${props.text} Banner`}</header>
}

export default Banner
