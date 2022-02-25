import React from 'react'
import styled from 'styled-components'
import { useCards } from './hooks/useCards'
import TimeTrackHeader from './TimeTrackHeader'
import TimerCard from './TimerCard'
import EditCardBox from './EditCardBox'
import { SOverlay } from './styled/SOverlay'
import { SGrid, SGridItem } from './styled/SGrid'
import { PlusIcon as _PlusIcon } from './Icon'

const TimeTrack = () => {
  console.log('TimeTrack is rendered')

  const {
    cards,
    checkedTags,
    handleCheckTag,
    handleArchive,
    handleRunning,
    updateTime,
    addCard,
    addMode,
    setAddMode,
  } = useCards()

  return (
    <div id="timeTrack" className="timeTrack mainContent js-switchScreen">
      <TimeTrackHeader
        checkedTags={checkedTags}
        handleCheckTag={handleCheckTag}
        handleArchive={handleArchive}
      />
      <SGrid>
        <SGridItem>
          <SButtonAdd onClick={() => setAddMode(true)}>
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
                />
              </SGridItem>
            )
          })}
      </SGrid>
      {addMode && (
        <>
          <EditCardBox mode="add" onSubmit={el => addCard(el)} />
          <SOverlay onClick={() => setAddMode(false)} />
        </>
      )}
    </div>
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
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default TimeTrack
