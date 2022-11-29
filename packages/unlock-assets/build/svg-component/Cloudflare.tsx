import * as React from 'react'
import { SVGProps } from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgCloudflare = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.354 14.954c.246.345.303.81.155 1.316l-.12.429a.217.217 0 0 1-.204.154H.204a.173.173 0 0 1-.169-.147A4.429 4.429 0 0 1 0 16.178a3.634 3.634 0 0 1 3.531-3.636 2.562 2.562 0 0 1 2.223-3.18 2.584 2.584 0 0 1 1.793.5 5.69 5.69 0 0 1 10.938.583.28.28 0 0 1-.014.17l-.5 1.3c-.393 1.028-1.518 1.865-2.553 1.914l-8.736.112a.237.237 0 0 0-.204.155.194.194 0 0 0 .021.155.16.16 0 0 0 .134.07l8.659.113c.457.02.837.204 1.062.52Zm2.912-4.248A4.739 4.739 0 0 1 24 15.433c0 .443-.063.872-.176 1.28a.173.173 0 0 1-.169.126h-6.598c-.077 0-.126-.07-.098-.14l.14-.359c.395-1.027 1.513-1.864 2.554-1.913l1.92-.113a.238.238 0 0 0 .204-.155.198.198 0 0 0-.02-.154.16.16 0 0 0-.135-.07l-1.842-.113c-.458-.021-.837-.204-1.063-.52-.246-.345-.302-.81-.154-1.316l.337-1.175c.022-.056.07-.098.127-.098.077-.007.162-.007.24-.007Z"
    />
  </svg>
)

export type { SVGRProps }
export default SvgCloudflare
