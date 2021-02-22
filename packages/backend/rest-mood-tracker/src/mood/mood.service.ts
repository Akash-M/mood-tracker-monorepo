import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoodRepository } from 'src/db/repositories/mood.repository';
import { MoodEntity } from 'src/db/entities/mood.entity';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(MoodRepository)
    private moodRepository: MoodRepository,
  ) {}

  async findMoodEntriesByUser(user: any) {
    console.info(user);
    return await this.moodRepository.findMoodEntries();
  }

  async insertMoodEntry(mood: MoodEntity) {
    return await this.moodRepository.insertMood(mood);
  }

  async updateMoodEntry(mood: MoodEntity) {
    return await this.moodRepository.updateMood(mood);
  }

  async deleteMoodEntry(moodEntry: { id: number }) {
    return await this.moodRepository.deleteMood(moodEntry.id);
  }
}
