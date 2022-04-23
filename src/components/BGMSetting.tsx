import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useRef,
  useContext,
} from 'react'
import ReactPlayer from 'react-player/youtube'
import styled from 'styled-components'
import { StatusContext } from './providers/statusProvider'
import { color } from '../theme/GlobalColor'
import { SButton } from './styled/SButton'

type Props = {
  defaultUrl: string
  type: string
}

const BGMSetting: React.VFC<Props> = props => {
  console.log('rendered BGMSetting')

  const { defaultUrl, type } = props
  const inputEl = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState(defaultUrl)
  const [playing, setPlaying] = useState(false)
  const { status } = useContext(StatusContext)

  const handleClick = useCallback((): void => {
    if (inputEl.current === null) return
    setUrl(inputEl.current.value)
  }, [])

  useEffect(() => {
    if (status === type) {
      setPlaying(true)
    } else {
      setPlaying(false)
    }
  }, [status])

  return (
    <SBgmWrap>
      <label htmlFor="bgm">動画のURLからBGMを読み込みます。</label>
      <div className="flex">
        <SInput id="bgm" ref={inputEl} />
        <SButton onClick={handleClick}>Load</SButton>
      </div>
      <SYoutubeWrap>
        {url && <ReactPlayer url={url} playing={playing} controls={true} />}
      </SYoutubeWrap>
    </SBgmWrap>
  )
}
const SBgmWrap = styled.div`
  margin-bottom: 64px;
`
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

const SYoutubeWrap = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 600px;
  margin: 24px 0;
  border: 1px dashed ${color.grayBorder};
  background: #fff;
  > div {
    max-width: 100%;
  }
  iframe {
    aspect-ratio: 16 / 9;
    width: 100%;
    vertical-align: middle;
  }
`

export default memo(BGMSetting)
