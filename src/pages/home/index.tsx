// import { login, editStudet, getPartList } from '../../api/api';
import React, { useState } from 'react';
import { Button, Modal, Input, Form, Divider } from 'antd';
import { history } from 'umi';
import './index.less';
import { useEffect } from 'react';
import { useDispatch } from 'umi';

export default function HomePage() {
  const [completedInfoBoxShow, setCompletedInfoBoxShow] = useState(false);
  const [hasUnCompleteTask, setHasUnCompleteTask] = useState(false);
  const [infoShow, setInfoShow] = useState(false);

  const navToQuestionPage = () => {
    history.push('/question');
  };

  /**
   * @event componentDidMount 生命周期
   * @description 加载试题分类列表以及分类答案
   */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'question/getPartList',
    });
  }, []);

  return (
    <div className="app">
      <div className="index">
        <div className="icon">
          <img src={require('../../assets/images/tree.png')} />
        </div>
        <div className="introduce">
          <div className="content">
            <span>树人教育：学商测试</span>
          </div>
          <div className="content">
            <span>测试内容：考察学生各方面能力</span>
          </div>
          <div className="content">
            <span>测试时间：不限</span>
          </div>
          <div className="content">
            <span>提交条件：题目全部完成后方可提交</span>
          </div>
          <div className="content">
            <span>测试形式：选择题</span>
          </div>
        </div>
      </div>
      <div className="button">
        <Button size="large" className="start-btn" onClick={navToQuestionPage}>
          开始测试
        </Button>
        <Button
          size="large"
          className="btn1"
          onClick={() => {
            history.push('/analysis');
          }}
        >
          查看结果
        </Button>
      </div>
      <div className="about">
        <Divider type="horizontal">
          <a href="#">学术支持</a>
        </Divider>
        <div>
          本测试由西南大学心理学部《中小学生学习能力及创新思维培养》、《学习与思维策略训练》课题组提供学术支持
        </div>
      </div>

      <Modal visible={false} okText="微信授权" cancelText="取消">
        <div className="tishi-img">
          <img src={require('../../assets/images/tree.png')} width="100%" />
        </div>
        <div className="quanxian-content">学商测试申请获得以下权限：</div>
        <div className="quanxian">获得你的公开信息(昵称、头像等)</div>
        <div className=""></div>
      </Modal>

      <Modal visible={infoShow}>
        <div className={infoShow ? 'tishi' : 'hide-all'}>
          <Form>
            <Input
              name="value"
              title="学生姓名:"
              type="span"
              placeholder="请输入学生姓名"
            />
            <Input
              name="value"
              title="学　　校:"
              type="span"
              placeholder="请输入就读学校"
            />
            <Input
              name="value"
              title="年　　级:"
              type="span"
              placeholder="请输入就读年级"
            />
            <Input
              name="value"
              title="家长电话:"
              type="phone"
              placeholder="请输入家长电话"
            />
          </Form>
        </div>
      </Modal>

      <Modal
        title="提示"
        visible={hasUnCompleteTask}
        okText="继续测试"
        cancelText="重新开始"
      >
        <div className="prompt">
          检测到你上次有未完成的测试，是否继续上次未完成的测试？
        </div>
      </Modal>
    </div>
  );
}
