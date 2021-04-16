import { FunctionComponent, useState, useMemo } from 'react';
import { Divider, PageHeader } from 'antd';
import { HistoryItem } from '../../../@types/question';
import { useEffect } from 'react';
import { QuestionStateType } from '@/models/question';
import { connect, useDispatch, history } from 'umi';
import Chart from '@/pages/components/Chart';
import './index.less';

export interface Props {
  location: any;
  question: QuestionStateType;
}

const AnalysisPage: FunctionComponent<Props> = (props) => {
  const { location, question } = props;

  const [userInfo, setUserInfo] = useState<HistoryItem>({
    allScore: 0,
    answerArray: '',
    avatar: '',
    created_at: '',
    id: 0,
    name: '',
    parent_phone: '',
    school_name: '',
    scoreArray: '',
    status: 0,
    student_name: '',
  });

  const [nameList, setNameList] = useState<{ name: string }[]>([]);
  const [valueList, setValueList] = useState<number[]>([]);

  const dispatch = useDispatch();

  const getAnswer = (index: number, score: number) => {
    // 0-10分  => 0,1
    // 11-15分  => 2
    // 16-20分   => 3
    // 21-25分    => 4

    const answerIndex = Math.floor((score - 1) / 5);

    switch (answerIndex) {
      case 0:
      case 1:
        return question.partList[index]?.a_answer;
      case 2:
        return question.partList[index]?.b_answer;
      case 3:
        return question.partList[index]?.c_answer;
      case 4:
        return question.partList[index]?.d_answer;
      default:
        return question.partList[index]?.d_answer;
    }
  };

  useEffect(() => {
    // 先检查有没有 partList
    if (!question?.partList.length) {
      dispatch({
        type: 'question/getPartList',
        payload: {},
      });
    }
    // 转换路由参数
    if (location?.query?.scoreInfo) {
      console.log(JSON.parse(location.query.scoreInfo));
      setUserInfo(() => JSON.parse(location.query.scoreInfo));
    }
  }, []);

  const names = useMemo(() => {
    // 构造 nameValueList
    return question.partList.map((item) => {
      return { name: item.name };
    });
  }, [question.partList]);

  const values = useMemo(() => {
    return userInfo.scoreArray.split('-').map((n) => Number(n));
  }, [userInfo]);

  const resultDom = userInfo.scoreArray.split('-').map((score, index) => {
    return (
      <div key={index}>
        <Divider>{question?.partList[index]?.name}</Divider>
        <div className="result-text">{getAnswer(index, Number(score))}</div>
      </div>
    );
  });

  return (
    <div className="analysis-index">
      <div className="question-header">
        <PageHeader
          style={{
            color: '#fff !important',
            padding: '5px 10px',
          }}
          onBack={() => history.push('/analysis/list')}
          title={
            <span
              onClick={() => {
                history.push('/analysis/list');
              }}
            >
              返回{' '}
            </span>
          }
          subTitle="成绩分析"
        />
      </div>
      <div className="introduce">
        <div className="name">
          <span>{userInfo.student_name}</span>
        </div>
        <div className="item">
          <span>{userInfo.school_name}</span>
        </div>
        <div className="score">
          得分：
          <span className="score-text">{userInfo.allScore}</span>分
        </div>
      </div>
      <Divider>成绩分布图</Divider>
      <div className="echarts-container">
        <Chart nameList={names} valueList={values} />
      </div>
      <Divider>成绩分析</Divider>
      <div className="result">{resultDom}</div>
      <Divider>关于测试</Divider>
      <div className="about">
        <div>过程决定结果！</div>
        <div>提高学商，就是重构学习过程。</div>
        <div>没有学商，何来过程！</div>
        <div>忽视过程，哪来成绩！</div>
        <div className="tuiguang">
          扫描下方二维码，免费获取学商专家十课时咨询诊断服务
        </div>
      </div>
      <Divider>专家联系方式</Divider>
      <div className="img">
        <img
          style={{ width: '200px', height: '200px', background: '#fff' }}
          src={require('@/assets/images/wechat.jpg')}
        />
      </div>
      <Divider>我是底线</Divider>
    </div>
  );
};

const mapStateToProps = ({ question }: { question: QuestionStateType }) => {
  return { question: question };
};

export default connect(mapStateToProps)(AnalysisPage);
