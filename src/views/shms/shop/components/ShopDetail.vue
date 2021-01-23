<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="shop" :rules="rules" ref="shopFrom" label-width="150px">
      <el-form-item label="店铺名称：" prop="name">
        <el-input v-model="shop.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺首字母：">
        <el-input v-model="shop.firstLetter"></el-input>
      </el-form-item>
      <el-form-item label="店铺LOGO：" prop="logo">
        <single-upload v-model="shop.logo"></single-upload>
      </el-form-item>
      <el-form-item label="店铺简介：">
        <el-input
          placeholder="请输入内容"
          type="textarea"
          v-model="shop.shopStory"
          :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="shop.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="shop.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('shopFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('shopFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createShop, getShop, updateShop} from '@/api/shop'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultShop={
    shopStory: '',
    firstLetter: '',
    logo: '',
    name: '',
    showStatus: 0,
    sort: 0
  };
  export default {
    name: 'ShopDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        shop:Object.assign({}, defaultShop),
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请输入店铺logo', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getShop(this.$route.query.id).then(response => {
          this.shop = response.data;
        });
      }else{
        this.shop = Object.assign({},defaultShop);
      }
    },
    methods: {
      //提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                //更新shop
                updateShop(this.$route.query.id, this.shop).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createShop(this.shop).then(response => {
                  this.$refs[formName].resetFields();
                  this.shop = Object.assign({},defaultShop);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        //重置 设置为默认Shop
        this.$refs[formName].resetFields();
        this.shop = Object.assign({},defaultShop);
      }
    }
  }
</script>
<style>
</style>


