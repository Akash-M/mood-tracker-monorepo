import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';

import AddEntry from '../../components/mood-entry/AddEntry';
import MoodList from '../../components/mood-entry/MoodList';
import { MoodActions } from '../../store/mood/types';

import './mood-entry.scss';

const MoodEntry = () => {
  const { t } = useTranslation(['MoodEntry']);
  const dispatch = useDispatch();

  const getMoodEntries = async () => {
    await dispatch({
      type: MoodActions.FETCH_MOODS,
    });
  };

  return (
    <article className="mood-entry">
      <section className="mood-entry__header">
        <Header as="h2">{t('header')}</Header>

        <Header as="h3">{t('description')}</Header>
      </section>

      <AddEntry />

      <MoodList />

      <Button onClick={getMoodEntries}>Get Entries</Button>
    </article>
  );
};

export default MoodEntry;
