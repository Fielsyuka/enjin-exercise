import React from 'react'
import styled from 'styled-components'

const generateSvg = (d: string) => {
  return function Icon({ className }: { className?: string }) {
    return (
      <SVGBase className={className} xmlns="http://www.w3.org/2000/svg">
        <path d={d} />
      </SVGBase>
    )
  }
}

const SVGBase = styled.svg`
  display: inline-block;
  width: 32px;
  height: 32px;
`

export const PlayIcon = generateSvg(
  'm28 16.54-10-5.78a4 4 0 0 0-6 3.46v11.56a4 4 0 0 0 6 3.46l10-5.78a4 4 0 0 0 0-6.92ZM20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0Zm0 36a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z',
)

export const StopIcon = generateSvg(
  'M26 12H14a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2ZM20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0Zm0 36a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z',
)

export const PlusIcon = generateSvg(
  'M15 7H9V1a1 1 0 0 0-2 0v6H1a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0V9h6a1 1 0 0 0 0-2Z',
)
