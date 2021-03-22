import { Button, Progress } from 'antd';
import './index.less';

type Question = {
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
};
type Answer = {
  label?: string; // 答案内容
  value: number; // 答案选项索引
  key: number; // 对应分值
};

type StateType = {
  buttonShow: boolean; // 是否展示按钮
  currentQuestionPartName: string; // 当前问题所属模块
  nowIndex: number; // 当前题目索引
  answerArray: Array<any>; // 答案数组
  doneQuestion: Array<boolean>; // 做过的题目数组
  chooesAnswer: Answer; //选择的答案
  currentQuestion: string; // 当前题目
  currentAnswerList: Array<Answer>; // 当前问题答案选项数组
};
export default function QuestionPage() {
  /*       buttonShow: false, // 按钮是否禁用
      answerArray: [],
      doneQuestion: [],
      nowIndex: 0, // 当前题目索引
      // 选择的答案
      chooesAnswer: {
        value: -1,
        key: 0,
      },
      currentQuestionPartName: '',
      currentQuestion: '',
      currentAnswerList: [
        {
          label: '',
          value: 0,
          key: 1,
        },
        {
          label: '',
          value: 1,
          key: 2,
        },
        {
          label: '',
          value: 2,
          key: 3,
        },
        {
          label: '',
          value: 3,
          key: 4,
        },
        {
          label: '',
          value: 4,
          key: 5,
        },
      ], */

  /*

  componentWillUnmount() {
    if (!this.isPushAnswer && this.state.doneQuestion.includes(true)) {
      Taro.setStorageSync('questionState', JSON.stringify(this.state));
      Taro.setStorageSync('questionList', JSON.stringify(this.questionList));
      Taro.setStorageSync(
        'questionScoreArray',
        JSON.stringify(this.scoreArray),
      );
    } else {
      Taro.setStorageSync('questionState', false);
      Taro.setStorageSync('questionList', false);
      Taro.setStorageSync('questionScoreArray', false);
    }
  }

  componentDidShow() {
    this.initList();
  }
  // 初始化获取数组
  initList() {
    const cacheState = Taro.getStorageSync('questionState')
      ? JSON.parse(Taro.getStorageSync('questionState'))
      : null;
    if (cacheState) {
      this.setState(
        {
          ...this.state,
          ...cacheState,
        },
        () => {
          this.answerArray = this.state.answerArray;
          this.questionList = JSON.parse(Taro.getStorageSync('questionList'));
          this.questionArray = this.questionList.map((item) => {
            return item.id;
          });
          this.scoreArray = JSON.parse(
            Taro.getStorageSync('questionScoreArray'),
          );
          this.setCurrentQuestion(this.state.nowIndex);
        },
      );
    } else {
      getList().then((res) => {
        const { data } = res.data;
        this.questionList = data.flat(1);
        this.questionArray = this.questionList.map((item) => {
          return item.id;
        });
        // 答案数组
        this.answerArray = this.answerArray.fill(-1);
        this.setState({
          nowIndex: 0,
          chooesAnswer: {
            value: -1,
            key: 0,
          },
          currentQuestion: '',
          doneQuestion: new Array(50).fill(false),
          answerArray: this.answerArray,
        });
        // 分数数组
        this.scoreArray = this.scoreArray.fill(-1);
        this.setCurrentQuestion(0);
      });
    }
    this.forumList = JSON.parse(Taro.getStorageSync('forumList'));
  }

  setCurrentQuestion(index): void {
    // 获取题数
    const length = this.questionList.length;
    // 当前题目索引
    let nowIndex = index;
    // 下一题
    let nextQuestion: Question;
    // 判断是否为最后一题
    if (nowIndex < length) {
      nextQuestion = this.questionList[nowIndex];
      // 设置题目
      this.setState({
        currentQuestion: nextQuestion.title,
      });
      let partName: string = '';
      this.forumList.forEach((item) => {
        if (item.id == nextQuestion.part_id) partName = item.name;
      });
      this.setState({
        currentQuestionPartName: partName,
      });
      // 设置答案
      this.setState({
        currentAnswerList: [
          {
            label: nextQuestion.a_answer,
            value: 0,
            key: nextQuestion.a_score,
          },
          {
            label: nextQuestion.b_answer,
            value: 1,
            key: nextQuestion.b_score,
          },
          {
            label: nextQuestion.c_answer,
            value: 2,
            key: nextQuestion.c_score,
          },
          {
            label: nextQuestion.d_answer,
            value: 3,
            key: nextQuestion.d_score,
          },
          {
            label: nextQuestion.e_answer,
            value: 4,
            key: nextQuestion.e_score,
          },
        ],
      });
      this.setState({
        chooesAnswer: {
          value: this.answerArray[nowIndex],
          key: this.scoreArray[nowIndex],
        },
      });
      this.setState({
        nowIndex: nowIndex,
      });
      if (nowIndex > 3 && nowIndex < length - 2) {
        this.scrollLeft = Number(nowIndex - 4) * 43;
      }
    }
  }
  numberList = new Array(50).fill(0).map((item, index) => index + 1);
  questionList: Array<any> = [];
  // 问题数组
  questionArray: Array<any> = new Array(50);
  // 答案数组
  answerArray: Array<any> = new Array(50);
  // 分数数组
  scoreArray: Array<any> = [];
  // 版块列表
  forumList: Array<any> = [];
  // 答案key
  AnwserKey = ['A', 'B', 'C', 'D', 'E'];
  // 滚动条左边距离
  scrollLeft = 0;
  // 是否提交答案
  isPushAnswer = false;
  // 选择选项
  chooesAnswer(value, key) {
    const index = this.state.nowIndex;
    this.setState({
      chooesAnswer: {
        value: value,
        key: key,
      },
    });
    this.answerArray.splice(index, 1, value);
    this.scoreArray.splice(index, 1, key);
    this.setState({
      answerArray: this.answerArray,
    });
    let doneQ = this.state.doneQuestion;
    doneQ.splice(index, 1, true);
    this.setState({
      doneQuestion: doneQ,
    });
    if (!this.answerArray.includes(-1) && !this.scoreArray.includes(-1)) {
      this.setState({
        buttonShow: true,
      });
      Taro.showToast({
        title: '恭喜你已经做完全部的题目了，快去提交试卷吧！',
      });
      return false;
    }
    if (index < this.questionList.length - 1) {
      setTimeout(() => {
        this.setCurrentQuestion(index + 1);
      }, 100);
    } else {
      Taro.showToast({
        title: '前面是不是还有题目忘记做了呢？快回去做吧！',
        icon: 'none',
        duration: 2000,
      });
    }
  }

  addAnswer() {
    let scoreArray: Array<number> = [];
    let sum = 0;
    let scoreSum = 0;
    this.scoreArray.forEach((item, index) => {
      scoreSum += item;
      sum += item;
      if (index % 5 === 4) {
        scoreArray.push(sum);
        sum = 0;
      }
    });
    let params = {
      questionArray: this.questionArray.join('-'),
      answerArray: this.answerArray.join('-'),
      scoreArray: scoreArray.join('-'),
      allScore: scoreSum,
    };
    Taro.showLoading({
      title: '答案提交中...',
    });
    pushAnwser(params).then((res) => {
      const { err_code, data, err_msg } = res.data;
      if (err_code === 0) {
        Taro.hideLoading();
        this.isPushAnswer = true;
        Taro.showToast({
          title: '提交成功!',
          duration: 2000,
          success() {
            Taro.redirectTo({
              url: '/pages/analysis/index?id=' + data.id,
            });
          },
        });
      } else {
        Taro.hideLoading();
        Taro.showToast({
          title: err_msg,
          duration: 2000,
          icon: 'none',
        });
      }
    });
  }
  onScroll(e) {}
  config: Config = {
    navigationBarTitlespan: '正在答题',
    navigationBarBackgroundColor: '#708fe4',
    navigationBarspanStyle: 'white',
  }; */

  /*     const nowIndex = this.state.nowIndex;
    const anwserList = this.state.currentAnswerList.map((item, index) => {
      return (
        <div
          className={
            this.state.chooesAnswer.value == item.value
              ? 'answer-item checked'
              : 'answer-item'
          }
          key={index}
          onClick={this.chooesAnswer.bind(this, item.value, item.key)}
        >
          {this.AnwserKey[item.value]}.{item.label}
        </div>
      );
    }); */

  const Threshold = 20;
  return (
    <div>
      <Progress
      // percent={this.state.nowIndex * 2 + 2}
      />
      <div className="question">
        <div className="item-box">
          {/*    <Scrolldiv
              className="scrolldiv"
              scrollX
              scrollWithAnimation
              scrollLeft={this.scrollLeft}
              lowerThreshold={Threshold}
              onScroll={this.onScroll}
            > */}
          {/*      {this.numberList.map((item, key) => {
                return (
                  <div
                    key={Math.random() * key}
                    className={classNames('question-item', {
                      done: this.state.doneQuestion[item - 1],
                      current: this.state.nowIndex === key,
                    })}
                    onClick={this.setCurrentQuestion.bind(this, item - 1)}
                  >
                    {item}
                  </div>
                );
              })} */}
        </div>
        <div className="question-box">
          <div className="question-title">
            {/*   {`${nowIndex + 1}【${this.state.currentQuestionPartName}】${
                this.state.currentQuestion
              }`} */}
          </div>
          {/*   <div className="answer-box">{anwserList}</div> */}
        </div>
        <div>
          <Button
            className="button"
            /*  disabled={!this.state.buttonShow}
              onClick={this.addAnswer.bind(this)} */
            shape="circle"
            type="default"
          >
            提交
          </Button>
        </div>
      </div>
    </div>
  );
}
