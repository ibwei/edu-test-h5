import { FunctionComponent, useState } from 'react';
import { Divider } from 'antd';
import './index.less';

export interface Props {}

const AnalysisPage: FunctionComponent<Props> = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  return (
    <div className="analysis-index">
      <div className="introduce">
        <div className="name">
          <span>{userInfo.student_name}</span>
        </div>
        <div className="item">
          <span>
            {userInfo.school_name} / {userInfo.grade}
          </span>
        </div>
        <div className="score">
          得分：<span>score</span> 分
        </div>
      </div>
      <Divider>成绩分布图</Divider>
      <div className="echarts">
        {/*   <ec-canvas
          id="mychart-dom-area"
          ref={this.refCharts}
          canvas-id="mychart-area"
          ec={this.state.ec}
        ></ec-canvas> */}
      </div>
      <Divider>成绩分析</Divider>
      <div className="result">forumDom</div>
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

export default AnalysisPage;
