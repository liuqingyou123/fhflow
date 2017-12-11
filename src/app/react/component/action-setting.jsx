import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Radio, message, Tabs } from 'antd';
import '../style/action-setting.scss';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

class ActionSettingForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { submitHandler } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                submitHandler(values);
                message.success('项目配置更新成功');
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {

        const { actionSetting, selectedIndex } = this.props;
        const { choseFunctions, workSpace, uploadHost, uploadPort,
            uploadUser, uploadPass, uploadRemotePath, uploadIgnoreFileRegExp,
            uploadType, packType, packVersion, packFileRegExp, packTpye } = actionSetting;

        const functionOptions = [
            { label: '开启LiveReload浏览器自动刷新', value: 'liveReload' },
            { label: '开启REM适配解决方案', value: 'rem' },
            { label: '开启文件版本(MD5)去缓存解决方案', value: 'md5' },
            { label: '开启文件变动增量编译支持', value: 'fileAddCompileSupport' }
        ];


        const radioValue = 1;
        const packageValue = 1;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                {
                    /*
                    <FormItem label="工作区路径">
                        <Input readOnly placeholder="工作区路径" size="small" value={workSpace} />
                    </FormItem>
                    */
                }
                <FormItem label="功能">
                    {getFieldDecorator('choseFunctions', {
                        initialValue: choseFunctions,
                    })(
                        <CheckboxGroup className="functionGroup" options={functionOptions} />
                        )}
                </FormItem>
                <div className="modulName">上传模式配置</div>
                <InputGroup size="small" >
                    <FormItem >
                        {getFieldDecorator('ip', {
                            initialValue: uploadHost,
                            rules: [{
                                // required: true, message: 'ip为必填项',
                            }
                                // ,{
                                //     validator(rule,values,callback){
                                //         var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                                //         if(!reg.test(values)){
                                //             callback('请输入正确的ip地址');
                                //         }else{
                                //             callback();
                                //         }

                                //     }
                                // }
                            ],
                        })(
                            <Input placeholder="服务器地址" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadPort', {
                            initialValue: uploadPort,
                        })(
                            <Input placeholder="端口号" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadRemotePath', {
                            initialValue: uploadRemotePath,
                        })(
                            <Input placeholder="远程路径" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadUser', {
                            initialValue: uploadUser,
                        })(
                            <Input placeholder="用户名" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadPass', {
                            initialValue: uploadPass,
                        })(
                            <Input placeholder="密码" type="password" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadIgnoreFileRegExp', {
                            initialValue: uploadIgnoreFileRegExp,
                        })(
                            <Input placeholder="过滤上传文件(支持正则匹配)" size="small" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('uploadType', {
                            initialValue: uploadType,
                        })(
                            <RadioGroup onChange={this.onUploadChange}>
                                <Radio value="ftp">FTP</Radio>
                                <Radio value="sftp">SFTP</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                </InputGroup>
                <FormItem label="打包">
                    {getFieldDecorator('packVersion', {
                        initialValue: packVersion,
                    })(
                        <Input placeholder="版本号" size="small" />
                        )}
                    {getFieldDecorator('packFileRegExp', {
                        initialValue: packFileRegExp,
                    })(
                        <Input placeholder="自定义命名规则" size="small" />
                        )}
                    {getFieldDecorator('packType', {
                        initialValue: packType,
                    })(
                        <RadioGroup >
                            <Radio value="rar">rar</Radio>
                            <Radio value="zip">zip</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem >
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        重置
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

class SeniorDevelopSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (values) => {
        console.log(values);
        const { submitHandler } = this.props;
        var obj = {};
        obj.choseModules = values;
        submitHandler(obj);
    }

    render() {
        const { actionSetting, selectedIndex } = this.props;
        const { modules, choseModules } = actionSetting;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="模块设置">
                    {
                        getFieldDecorator('choseModules', {
                            initialValue: choseModules,
                        })(
                            <CheckboxGroup options={modules} onChange={this.onChange} />
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}



const WrappedActionSettingForm = Form.create()(ActionSettingForm);
const WrappedSeniorDevelopSettingForm = Form.create()(SeniorDevelopSetting);

export default class ActionSetting extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { actionSetting, selectedIndex, submitProjectSettingHandler } = this.props;
        return (
            <div className="action-setting">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="apple" />项目设置</span>} key="1">
                        <WrappedActionSettingForm actionSetting={actionSetting} selectedIndex={selectedIndex} submitHandler={submitProjectSettingHandler} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />开发设置</span>} key="2">
                        <WrappedSeniorDevelopSettingForm actionSetting={actionSetting} selectedIndex={selectedIndex} submitHandler={submitProjectSettingHandler} />
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}