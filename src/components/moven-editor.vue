<!--
 * @Author: hayyot
 * @Date: 2023-04-04 10:49:04
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\components\moven-editor.vue
-->
<template lang="html">
    <div class="editor" >
      <div ref="editor" class="textNeirong" >
      </div>
    </div>
</template>
  <script>
  import E from 'wangeditor'
    //上传图片和视频的地址，根据后端给的地址确定
   
  export default {
    name: 'editoritem',
    data() {
      return {
        // uploadPath,components
        editor: null,
        info_: null,
        token: ''
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      },
      state: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function (value) {
        // console.log(value)
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
        //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
      },
      state(value){
        //true是启用 false是禁用
        console.log(value)
        // debugger
        if (value===true){
          // 启用
          this.editor.enable()
        }else{
          // 禁用编辑器
          this.editor.disable()
        }
      },
   
   
   
    },
    created() {
   
    },
    mounted() {
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods: {
   
   
      seteditor() {
        //上传图片配置
        this.editor = new E(this.$refs.editor)
        this.editor.config.height = 600  //富文本编辑器的高度
        // this.editor.config.maxlength =1000
        //无特殊需求，请慎用 maxLength ，这可能会导致编辑器内容过多时，编辑卡顿
        this.editor.config.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.config.uploadImgServer = 'http://47.107.225.176:8808/wzuploadImage'// 填写配置服务器端地址
        this.editor.config.uploadImgHeaders = {'Accept': "application/json, text/plain, */*"}// 自定义 header
        this.editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.config.uploadImgMaxSize = 8 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.config.uploadImgMaxLength = 6 // 限制一次最多上传 6 张图片
        this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
        // 自定义 onchange 触发的延迟时间，默认为 200 ms
        this.editor.config.onchangeTimeout = 1000 // 单位 ms
   
        this.editor.config.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
   
        this.editor.config.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
            console.log(xhr)
            console.log(editor)
            console.log(result)
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
   
            console.log(xhr)
            console.log(editor)
            console.log(result)
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
            console.log(xhr)
            console.log(editor)
   
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
            console.log(xhr)
            console.log(editor)
          },
          customInsert: (insertImg, result, editor) => {
            //循环插入图片
            console.log(result)
   
            result.data.url = result.data.url
            console.log(result.data.url);
            insertImg(result.data.url)
          }
        }
   
        // //上传视频配置
        // //官网提示：
        // // 考虑到文件较大，所以暂时只允许一个视频上传
        // // this.editor.config.showLinkVideo = false //可隐藏插入网络视频的功能，即只保留上传本地视频。
        // this.editor.config.uploadVideoServer = 'http://localhost:8808/wzuploadImage'// 填写配置服务器端地址
        // this.editor.config.uploadVideoMaxSize = 1 * 1024 * 1024 * 1024 // 1024m 默认限制视频大小是 1024m ，可以自己修改。
        // this.editor.config.uploadVideoAccept = ['mp4'] //限制类型
        // this.editor.config.uploadVideoName = 'file' // 后端接受上传文件的参数名
        // this.editor.config.uploadVideoHeaders = {'Accept': "application/json, text/plain, */*"}// 自定义 header
        // this.editor.config.uploadVideoTimeout = 1000 * 60 * 5  //timeout 即上传接口等待的最大时间，默认是 5分钟，可以自己修改。
        // this.editor.config.uploadVideoHooks = {
        //   // 上传视频之前
        //   before: function (xhr) {
        //     console.log(xhr)
        //     // 可阻止视频上传
        //     // return {
        //     //   prevent: true,
        //     //   msg: '需要提示给用户的错误信息'
        //     // }
        //   },
        //   // 视频上传并返回了结果，视频插入已成功
        //   success: function (xhr) {
        //     console.log('success', xhr)
        //   },
        //   // 视频上传并返回了结果，但视频插入时出错了
        //   fail: function (xhr, editor, resData) {
        //     console.log('fail', resData)
        //   },
        //   // 上传视频出错，一般为 http 请求的错误
        //   error: function (xhr, editor, resData) {
        //     console.log('error', xhr, resData)
        //   },
        //   // 上传视频超时
        //   timeout: function (xhr) {
        //     console.log('timeout')
        //   },
        //   // 视频上传并返回了结果，想要自己把视频插入到编辑器中
        //   // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
        //   customInsert: function (insertVideoFn, result, editor) {
   
        //     //循环插入图片
        //     console.log(result)
    
        //     result.data.url = Url + result.data.url
   
        //     // result 即服务端返回的接口
        //     console.log('customInsert', result)
   
        //     // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
        //     insertVideoFn(result.data.url)
        //   }
        // }
   
   
      }
    }
  }
  </script>
   
  <style scoped>
  .editor {
    /* width: 200px; */
    text-align: left;
    margin: auto;
    position: relative;
  }
  </style>
   
   