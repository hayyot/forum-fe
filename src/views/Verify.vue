<template>
    <div>
        <canvas ref="canvas" width="120" height="50" @click="draw"></canvas>
<!--        <input type="text" v-model="userInput" placeholder="请输入验证码">-->
<!--        <button @click="checkCode">验证</button>-->
    </div>
</template>

<script>

export default {
    name: "mMq",
    props:["yzm"],
    data() {
        return {
            code: "",
            userInput: this.yzm,
        };
    },
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            // 绘制背景
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 生成随机字符串
            const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let code = "";
            for (let i = 0; i < 4; i++) {
                code += str[Math.floor(Math.random() * str.length)];
            }
            this.code = code;

            // 绘制验证码
            ctx.font = "28px Arial";
            for (let i = 0; i < code.length; i++) {
                ctx.fillStyle = this.getRandomColor();
                ctx.fillText(code[i], 20 + i * 25, 35);
            }

            // 应用歪曲效果
            for (let i = 0; i < 6; i++) {
                ctx.strokeStyle = this.getRandomColor();
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
        },
        getRandomColor() {
            return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
        },
        checkCode(res) {
            console.log(res)
            if (res.toLowerCase() == this.code.toLowerCase()) {
                // alert("验证码正确");
                this.$emit('changeOkLogin',1)
            } else {
                alert("验证码错误");
                this.draw();
                this.userInput = "";
            }
        },
    },
};

</script>
