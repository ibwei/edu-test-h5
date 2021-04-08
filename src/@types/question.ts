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
