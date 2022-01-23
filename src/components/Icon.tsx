import React from 'react'
import styled from 'styled-components'

const generateSvg = (d: string) => {
  return function Icon({ className }: { className?: string }) {
    return (
      <SVGBase
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <path d={d} transform="translate(-2 -2)" />
      </SVGBase>
    )
  }
}

const SVGBase = styled.svg`
  display: block;
  width: 32px;
  height: 32px;
`

export const PlayIcon = generateSvg(
  'M24.4,15.232l-8-4.624a3.2,3.2,0,0,0-4.8,2.768v9.248a3.2,3.2,0,0,0,4.8,2.768l8-4.624a3.2,3.2,0,0,0,0-5.536ZM18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,28.8A12.8,12.8,0,1,1,30.8,18,12.8,12.8,0,0,1,18,30.8Z',
)

export const StopIcon = generateSvg(
  'M22.8,11.6H13.2a1.6,1.6,0,0,0-1.6,1.6v9.6a1.6,1.6,0,0,0,1.6,1.6h9.6a1.6,1.6,0,0,0,1.6-1.6V13.2A1.6,1.6,0,0,0,22.8,11.6ZM18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,28.8A12.8,12.8,0,1,1,29.56,12.5,12.428,12.428,0,0,1,30.8,18,12.8,12.8,0,0,1,18,30.8Z',
)
