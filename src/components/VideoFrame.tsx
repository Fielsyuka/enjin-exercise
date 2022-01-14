import React, { useState, memo } from 'react'
import styled from 'styled-components'

const VideoFrame = () => {
  console.log('rendered VideoFrame')
  const [url, setUrl] = useState('')
  const [id, setId] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value)
  }

  const handleClick = (): void => {
    const youtubeID = url.split(/watch\?v=/)[1]
    if (!youtubeID) return
    setId(youtubeID)
  }

  return (
    <>
      <SInput onChange={handleChange} />
      <SButton onClick={handleClick}>Load Youtube</SButton>
      <p>{url}</p>
      {id && (
        <SIframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></SIframe>
      )}
    </>
  )
}

const SInput = styled.input.attrs({
  type: 'text',
})`
  width: 300px;
  max-width: 100%;
  padding: 1em;
  color: inherit;
  border: 1px solid #000;
  box-shadow: none;
  background-color: #f8f8f8;
`

const SButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  appearance: none;
  padding: 1em;
  border: 1px solid #000;
  box-shadow: none;
  background-color: #0f0f0f;
  color: #fff;
`

const SIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
`

export default memo(VideoFrame)
