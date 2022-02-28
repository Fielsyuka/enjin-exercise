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
    tagList,
    editMode,
    setEditMode,
    cardEditing,
    archiveMode,
    checkedTags,
    handleRunning,
    updateTime,
    handleEditCard,
    updateCard,
    deleteCard,
    handleTagList,
    handleArchive,
    handleCheckTag,
  } = useCards()

  return (
    <section id="timeTrack" className="timeTrack mainContent js-switchScreen">
      <div className="container">
        <TimeTrackHeader
          archiveMode={archiveMode}
          tagList={tagList}
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
              tagList={tagList}
              handleTagList={handleTagList}
              cardEditing={cardEditing}
              onSubmit={el => updateCard(el)}
              onDelete={id => deleteCard(id)}
            />
            <SOverlay onClick={() => setEditMode(false)} />
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
`

const SPlusIcon = styled(_PlusIcon)`
  width: 16px;
  height: 16px;
  margin-right: 1em;
`

export default TimeTrack
