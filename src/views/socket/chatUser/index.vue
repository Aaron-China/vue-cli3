<template>
  <div class="chat-user">
    <div class="user-list">
      <div class="user" v-for="item in chat.users" :key="item.id">
        {{item.name}}
        <div class="tool" @click="setDialog(item)">
          <AliwangwangOutlined class="tip" />
          <span :class="item.online ? 'active' : 'deactive'">{{item.online ? '在线' : '离线'}}</span>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="chat.dialog&&chat.dialog.id">
      <div class="top">
        <div class="item" v-for="item in chat.dialogList" :key="item.id">
          <div class="right" v-if="item.senderId === chat.dialog.senderId">
            {{item.content}} :{{item.senderName}} 
            <div class="time">发送时间: {{item.createdAt}}</div>
          </div>
          <div class="left" v-else>
            {{item.senderName}}： {{item.content}}
            <div class="time">发送时间: {{item.createdAt}}</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <a-input-group compact>
          <a-input style="width: 80%" v-model:value="chat.msg" placeholder="输入消息" @keyup.enter="send"></a-input>
          <a-button style="width: 20%" type="primary" @click="send">发送</a-button>
        </a-input-group>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onBeforeUnmount } from 'vue';
import io from "socket.io-client";
import { useStore } from 'vuex';
import dayjs from 'dayjs'
import { AliwangwangOutlined } from '@ant-design/icons-vue';


export default defineComponent({
  name: 'chatUser',
  components: {
    AliwangwangOutlined
  },
  setup () {
    console.log('-------------------------------')
    const store = useStore();
    let connected = false;
    let chat = reactive({
      users: [ // 根据在线状态排序
        {id: 1, name: '小红', auter: '', online: 1},
        {id: 2, name: '土豆', auter: '', online: 1},
        {id: 3, name: '地瓜子', auter: '', online: 0},
        {id: 4, name: '大牛', auter: '', online: 0},
        {id: 5, name: '大飞', auter: '', online: 0},
      ],
      dialog: {},
      dialogList: [],
      msg: ''
    });
    const socket = io('ws://localhost:3000', {auth: {id: store.state.app.user.id}});
    if(connected) {
      socket.on("connect", () => {
        console.log('链接成功');
        connected = true
      });
    }
    
    // 接收当前会话信息
    socket.on("chat/dialog/private/detail", (d) => {
      console.log(d)
      chat.dialog = {...d.detail}
      let newList = d.list.map(item => {
        item.createdAt = item.createdAt ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') : '';
        return item
      })
      chat.dialogList = [...newList]
    });
    // 接收最新消息
    socket.on("chat/dialog/private/receive", (d) => {
      console.log(d)
      chat.dialogList.push({...d, createdAt: d.createdAt ? dayjs(d.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''})
    });
    socket.on("disconnect", () => {
      console.log('离线'); 
      connected = false
    });

    // 链接或创建会话
    const setDialog = (d) => {
      const user = store.state.app.user;
      socket.emit('chat/dialog/private/detail', { 
        senderId: user.id,
        senderName: user.name,
        receiverId: d.id,
        receiverName: d.name
      });
    };
    // 发送消息
    const send = () => {
      console.log(chat.msg)
      const user = store.state.app.user;
      socket.emit('chat/dialog/private/send', {
        senderId: user.id,
        senderName: user.name,
        content: chat.msg,
        dialogId: chat.dialog.id,
      });
      chat.msg = ''
    };

    onBeforeUnmount(() => {
      connected = false
    })

    return {
      chat,
      setDialog,
      send
    }
  }
})
</script>

<style lang="less" scoped>
.chat-user{
  display: flex;
  justify-content: space-between;
  .user-list {
    width: 30%;
    .user {
      padding: 3px 15px;
      display: flex;
      justify-content: space-between;
      .tool {
        font-size: 12px;
        cursor: pointer;
        .tip {
          font-size: 20px;
        }
        .active {
          color: green;
        }
        .deactive {
          color: gray;
        }
      }
      &:hover {
        background-color: @active;
      }
    }
  }
  .dialog {
    width: 70%;
    height: 80vh;
    border: 1px solid;
    padding: 20px;
    .top {
      height: 90%;
      overflow-y: auto;
      .item {
        margin-bottom: 8px;
        .time {
          color: gray;
          font-size: 11px;
        }
        .left {
          text-align: left;
        }
        .right {
          text-align: right;
        }
      }
    }
  }
}
</style>
