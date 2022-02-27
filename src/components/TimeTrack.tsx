import React from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
import { useCards } from './hooks/useCards'
import TimeTrackHeader from './TimeTrackHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { SGrid, SGridItem } from './styled/SGrid'
import { PlusIcon as _PlusIcon } from './Icon'

type Props = {
  status: string
}

const TimeTrack: React.VFC<Props> = props => {
  console.log('TimeTrack is rendered')

  const { status } = props

  const {
    cards,
    editMode,
    cardEditing,
    updateTime,
    updateCard,
    setEditMode,
    archiveMode,
    handleEditCard,
    handleCheckTag,
    handleArchive,
    handleRunning,
    checkedTags,
  } = useCards()

  return (
    <section id="timeTrack" className="timeTrack mainContent js-switchScreen">
      <TimeTrackHeader
        archiveMode={archiveMode}
        checkedTags={checkedTags}
        handleCheckTag={handleCheckTag}
        handleArchive={handleArchive}
      />
      <SGrid>
        <SGridItem>
          <SButtonAdd onClick={() => handleEditCard()}>
            <SPlusIcon />
            新規追加
          </SButtonAdd>
        </SGridItem>
        {cards &&
          cards.map((card, index) => {
            return (
              <SGridItem key={index}>
                <TimerCard
                  id={card.id as string}
                  title={card.title}
                  relatedTag={card.relatedTag}
                  time={card.time}
                  isRunning={card.isRunning}
                  dateStart={card.dateStart}
                  updateTime={updateTime}
                  handleRunning={handleRunning}
                  status={status}
                  onClickEdit={handleEditCard}
                />
              </SGridItem>
            )
          })}
      </SGrid>
      {editMode && (
        <>
          <EditCardBox
            cardEditing={cardEditing}
            onSubmit={el => updateCard(el)}
          />
          <SOverlay onClick={() => setEditMode(false)} />
        </>
      )}
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
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default TimeTrack