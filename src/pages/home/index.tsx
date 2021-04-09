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

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarspanStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarspanStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  function getUserInfo() {
    /* if (res.detail.userInfo) {
      Taro.setStorageSync('shouquan', true)
      this.closeShouquan()
      const { userInfo } = res.detail
      Taro.setStorageSync('userInfo', JSON.stringify(userInfo))
      login().then(() => {
        Taro.setStorageSync('isLogin', true)
        getPartList()
      })
    } */
  }
  // 跳转测试页面
  /* function goTest() {
    const shouquan = Taro.getStorageSync('shouquan')
    const isLogin = Taro.getStorageSync('isLogin')
    if (shouquan == false) {
      this.setState({
        shouquanBox: true
      })
      return false
    }
    if (isLogin) {
      const userInfo = JSON.parse(Taro.getStorageSync('userInfo'))
      if (
        !userInfo.student_name ||
        !userInfo.school_name ||
        !userInfo.parent_phone ||
        !userInfo.grade
      ) {
        this.setState({
          infoShow: true
        })
      } else {
        const cacheState = Taro.getStorageSync('questionState')
        if (!cacheState) {
          this.goQuestion()
        } else {
          this.setState({
            prompt: true
          })
        }
      }
    }
  }
  goResult() {
    const shouquan = Taro.getStorageSync('shouquan')
    const isLogin = Taro.getStorageSync('isLogin')
    if (shouquan == false) {
      this.setState({
        shouquanBox: true
      })
      return false
    }
    if (isLogin) {
      Taro.navigateTo({
        url: '/pages/list/index'
      })
    }
  }
  onClose() {
    this.setState({
      infoShow: false
    })
  }
  onSubmit() {
    if (!this.studentInfo.name.trim()) {
      Taro.showToast({
        title: '学生姓名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    if (!this.studentInfo.school.trim()) {
      Taro.showToast({
        title: '学校不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    }

    if (!this.studentInfo.grade.trim()) {
      Taro.showToast({
        title: '年级不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    if (!this.studentInfo.tel) {
      Taro.showToast({
        title: '家长电话不能为空',
        icon: 'none',
        duration: 1000
      })
      return false
    } else {
      const regPhones = /^(\d{3,4}\-\d{3,8}$)|(\d{3}\-\d{4}\-\d{3}$)|(^\d{7}$)|(^\d{8}$)|(^\d{11}$)|(^\d{12}$)|(^1\d{10}$)/ //手机号和座机正则
      if (!regPhones.test(this.studentInfo.tel)) {
        Taro.showToast({
          title: '请输入正确的家长联系方式',
          icon: 'none',
          duration: 1000
        })
        return false
      }
    }

    const params = {
      parent_phone: this.studentInfo.tel.trim(),
      school_name: this.studentInfo.school.trim(),
      student_name: this.studentInfo.name.trim(),
      grade: this.studentInfo.grade.trim()
    }

    editStudet(params).then((res) => {
      if (res.data.err_code === 0) {
        this.onClose()
        this.goQuestion()
      }
    })
  }
  studentInfo = {
    name: '',
    school: '',
    grade: '',
    tel: ''
  }
  onChange(field, val) {
    this.studentInfo[field] = val
    if (field === 'tel') {
      this.studentInfo[field] = val.replace(/\D/g, '')
      return val.replace(/\D/g, '')
    }
    return val
  }
  closeShouquan() {
    this.setState({
      shouquanBox: false
    })
  }
  clearCache() {
    Taro.setStorageSync('questionState', false)
    this.setState({
      prompt: false
    })
    this.goQuestion()
  }
  continue() {
    this.setState({
      prompt: false
    })
    this.goQuestion()
  }

  } */

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
