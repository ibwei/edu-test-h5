export interface Question {
  title: string;
  a_answer: string;
  a_score: number;
  b_answer: string;
  b_score: number;
  c_answer: string;
  c_score: number;
  d_answer: string;
  d_score: number;
  e_answer: string;
  e_score: number;
  part_id: number;
}
export interface Answer {
  label?: string; // 答案内容
  value: number; // 答案选项索引
  key: number; // 对应分值
}

export interface StateType {
  buttonShow: boolean; // 是否展示按钮
  currentQuestionPartName: string; // 当前问题所属模块
  nowIndex: number; // 当前题目索引
  answerArray: Array<any>; // 答案数组
  doneQuestion: Array<boolean>; // 做过的题目数组
  chooesAnswer: Answer; //选择的答案
  currentQuestion: string; // 当前题目
  currentAnswerList: Array<Answer>; // 当前问题答案选项数组
}

// 问题类型
const question = {
  id: 437,
  title: '',
  part_id: 6,
  a_answer: '',
  a_score: 4,
  b_answer: '',
  b_score: 3,
  c_answer: '',
  c_score: 2,
  d_answer: '',
  d_score: 5,
  e_answer: '',
  e_score: 1,
  status: 1,
  deleted_at: '',
  created_at: '',
  updated_at: '',
};

export type QuestionItem = typeof question;

const part = {
  id: 6,
  name: '时间管理',
  a_answer:
    '你的时间管理能力为：差，几乎没有时间管理意识。学习中，你无法安排合理的预习时间，做作业拖拉。你需要新构建时间管理认知，在老师指导下重新梳理时间清单，找出学习的搞笑时间，可掌控时间，零散时间。做到，正确的时间做正确的事，高效的时间做关键的事，零散的时间做长效的事，你要明白：不懂时间管理，再勤奋也不过是个“劣质的勤奋者”。',
  b_answer:
    '你的时间管理能力为：较差，时间管理意识不强。不能及时完成作业，考试做不完卷子，基本完成不了学习计划。你需要在老师的指导下，找出学习的各个时间段，重新建立高效时间、可掌控时间、零散时间的认知，这几个认知对完成学习计划有重大影响，也是提升成绩的关键因素。',
  c_answer:
    '你的时间管理能力为：一般，有一定的时间管理意识。在学习生活中，有时能够顺利完成作业和考试，但有时却不能。考前复习经常不知所措，不知道怎么复习才高效，导致考试成绩总达不到自己的目标。你需要重新学习四象限法则，重建轻重缓急的认知，学会抓住学习的牛鼻子，事件进行分时、分类、分区处理，提升学习效率，才能提升成绩。',
  d_answer:
    '你的时间管理能力为：良好，时间管理意识较好。但当有外力阻碍学习，如同学影响、自身心态、老师安排等，就会打乱时间管理思路，导致计划经常无法执行。你需要在制定计划前排除障碍，保证执行，才能在成绩上有所突破。',
  order: 0,
  created_at: '2020-07-11 10:11:42',
};

export type PartItem = typeof part;

const history = {
  allScore: 0,
  answerArray: '',
  avatar: '',
  created_at: '2021-04-09 20:51:42',
  id: 110,
  name: '白唯',
  parent_phone: '',
  school_name: '',
  scoreArray: '',
  status: 0,
  student_name: '白小唯',
};

export type HistoryItem = typeof history;
