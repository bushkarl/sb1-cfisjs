interface WordSet {
  id: string;
  name: string;
  dataPath: string;
  lang: string;
  speechRate: number;
}

export const wordSets: Record<string, WordSet> = {
  english: {
    id: 'english',
    name: 'English Vocabulary',
    dataPath: 'https://prod-cr-vod.oss-cn-hangzhou.aliyuncs.com/res/manage-1234/study/api/english.json',
    lang: 'en-US',
    speechRate: 1,
  },
  pinyin: {
    id: 'pinyin',
    name: 'Chinese Pinyin',
    dataPath: 'https://prod-cr-vod.oss-cn-hangzhou.aliyuncs.com/res/manage-1234/study/api/pinyin.json',
    lang: 'zh-CN',
    speechRate: 0.3,
  },
};