import React, { useState, useCallback, memo } from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { SButton } from './styled/SButton'

const workOptions = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
    enablejsapi: 1,
    loop: 1,
  } as const, //https://github.com/tjallingt/react-youtube/issues/315
}

const breakOptions = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
    enablejsapi: 1,
    loop: 1,
  } as const,
}

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

  const onReady = useCallback(e => {
    e.target.mute()
    console.log('ready')
  }, [])

  return (
    <>
      <label htmlFor="bgm">YoutubeのURLから作業用BGMを読み込みます。</label>
      <div className="flex">
        <SInput id="bgm" value={url} onChange={handleChange} />
        <SButton onClick={handleClick}>Load</SButton>
      </div>
      <SworkBgmWrap>
        {id && (
          <YouTube videoId={id} opts={workOptions} />
          // <SIframe
          //   src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          //   title="YouTube video player"
          //   frameBorder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          //   allowFullScreen
          // ></SIframe>
        )}
      </SworkBgmWrap>
      <YouTube videoId="ut4DQVgUpjI" opts={breakOptions} onReady={onReady} />
    </>
  )
}
const SInput = styled.input.attrs({
  type: 'text',
})`
  width: 510px;
  max-width: 100%;
  padding: 0.5rem;
  color: inherit;
  border: 1px solid ${color.grayBorder};
  box-shadow: none;
  background-color: #fff;
`

const SworkBgmWrap = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 600px;
  margin: 24px 0;
  border: 1px dashed ${color.grayBorder};
  background: #fff;
  iframe {
    aspect-ratio: 16 / 9;
    width: 100%;
    vertical-align: middle;
  }
`

export default memo(BGMSetting)
