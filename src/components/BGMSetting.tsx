import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
// import InputText from './InputText'
import { SButton } from './styled/SButton'

const BGMSetting = () => {
  console.log('rendered BGMSetting')
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
      <label htmlFor="bgm">YoutubeのURLから作業用BGMを読み込みます。</label>
      <div className="flex">
        <SInput id="bgm" value={url} onChange={handleChange} />
        {/* <InputText
          id="bgm"
          value={url}
          autoComplete="true"
          placeholder="https://www.youtube.com/watch?v=2qIyQeXXi24"
          onChange={handleChange}
        /> */}
        <SButton onClick={handleClick}>Load</SButton>
      </div>
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
  width: 400px;
  max-width: 100%;
  padding: 0.5rem;
  color: inherit;
  border: 1px solid ${color.grayBorder};
  box-shadow: none;
  background-color: #fff;
`

const SIframe = styled.iframe`
  aspect-ratio: 16 / 9;
  width: 100%;
  margin: 24px 0;
`

export default memo(BGMSetting)
