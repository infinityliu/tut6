import React, { Component } from 'react'
import { TouchableHighlight, View, Text, TextInput, StyleSheet, Button } from 'react-native'

import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag'

export default class RNApp extends Component {
    constructor() {
        super()
        this.state = { name: '', phoneNum: '' };
    }

    render () {
        const query = gql`mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
                id
            }
        }`;

        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center', color: 'blue'}}>Add Customer</Text>
                <Mutation mutation={query}>
                    {(queryMutation, { data }) => (
                        <View>
                            <TextInput
                                style={styles.input1}
                                onChangeText={text => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder="name"
                            />
                            <TextInput
                                style={styles.input2}
                                onChangeText={text => this.setState({ phoneNum: text })}
                                value={this.state.phoneNum}
                                placeholder="phoneNum"
                            />
                            <Button
                                onPress={() => {
                                    queryMutation({
                                        variables: {
                                                issue: this.state
                                        }
                                    })
                                        .then(res => res)
                                        .catch(err => <Text>{err}</Text>);
                                    this.setState({ name: '', phoneNum: '' });
                                }}
                                title="Add"
                            />
                        </View>
                    )}
                </Mutation>
            </View>
        )
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input1: {
        backgroundColor: '#dddddd',
        height: 50,
        margin: 20,
        marginBottom: 0,
        paddingLeft: 10
    },
    input2: {
        backgroundColor: '#dddddd',
        height: 50,
        margin: 20,
        marginBottom: 50,
        paddingLeft: 10
    }
})