import React, { memo, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { StatusContext } from './providers/statusProvider'
import { color } from '../theme/GlobalColor'
import { useSelector, useDispatch } from 'react-redux'
import type { State } from '../reducer'
import { getInitialCard } from '../utils/utils'
import { useFilter } from './hooks/useFilter'
import TimeTrackHeader from './TimeTrackHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { SGrid, SGridItem } from './styled/SGrid'
import { PlusIcon as _PlusIcon } from './Icon'

const TimeTrack = () => {
  console.log('TimeTrack is rendered')

  const { status } = useContext(StatusContext)

  const modalContent = useSelector((state: State) => state.modalContent)
  const dispatch = useDispatch()

  const { cards, archiveMode, checkedTags, handleArchive, handleCheckTag } =
    useFilter()

  const onClickAddCard = useCallback(() => {
    dispatch({
      type: 'editingCard.setEditingCard',
      payload: getInitialCard(),
    })
    dispatch({
      type: 'modalContent.setModalContent',
      payload: 'editCard',
    })
  }, [])

  const onEditCard = useCallback(card => {
    dispatch({
      type: 'editingCard.setEditingCard',
      payload: card,
    })
    dispatch({
      type: 'modalContent.setModalContent',
      payload: 'editCard',
    })
  }, [])

  return (
    <section
      id="timeTrack"
      className={status + ' timeTrack mainContent js-switchScreen'}
    >
      <div className="container">
        <TimeTrackHeader
          archiveMode={archiveMode}
          checkedTags={checkedTags}
          handleCheckTag={handleCheckTag}
          handleArchive={handleArchive}
        />
        <SGrid>
          <SGridItem>
            <SButtonAdd onClick={onClickAddCard}>
              <SPlusIcon />
              新規追加
            </SButtonAdd>
          </SGridItem>
          {cards.length > 0 &&
            cards.map((card, index) => {
              return (
                <SGridItem key={index}>
                  <TimerCard
                    card={card}
                    status={status}
                    onEdit={() => onEditCard(card)}
                  />
                </SGridItem>
              )
            })}
        </SGrid>
        {modalContent === 'editCard' && (
          <>
            <EditCardBox />
            <SOverlay
              onClick={() =>
                dispatch({
                  type: 'modalContent.setModalContent',
                  payload: undefined,
                })
              }
            />
          </>
        )}
      </div>
    </section>
  )
}

const SButtonAdd = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 32px 16px;
  border-radius: 8px;
  border: 2px dashed #777;
  background-color: transparent;
  color: ${color.accent};
  @media screen and (min-width: 640px) {
    min-height: 170px;
  }
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default memo(TimeTrack)
