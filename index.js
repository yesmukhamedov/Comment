import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Form, Grid, Segment, TextArea } from 'semantic-ui-react';
import List from './List';

const Comment = ({ comments, send, intl: { messages } }) => {
    const initialState = {
        error: false,
        initialText: '',
        reply: { id: null, text: '' },
    };
    const [state, setState] = React.useState(initialState);
    const counter = comments =>
        comments.reduce(
            (count, comment) =>
                comment.childs.length
                    ? count + counter(comment.childs) + 1
                    : count + 1,
            0,
        );

    return (
        <Segment style={{ marginTop: 14 }}>
            <h4>{`${messages['H__COMMENT']} (${comments &&
                counter(comments)})`}</h4>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field error={state.error}>
                                <TextArea
                                    style={{ width: '100%' }}
                                    value={`${state.reply.text}`}
                                    onChange={(e, { value }) =>
                                        setState({
                                            ...state,
                                            error: false,
                                            reply: {
                                                ...state.reply,
                                                text: value,
                                            },
                                        })
                                    }
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    {[
                        [
                            'teal',
                            state.reply.text &&
                            !state.initialText.includes(state.reply.text)
                                ? () => {
                                      send(state.reply);
                                      setState({
                                          ...state,
                                          reply: initialState.reply,
                                      });
                                  }
                                : () => setState({ ...state, error: true }),
                            messages['send'],
                        ],
                        [
                            null,
                            () => setState(initialState),
                            messages['cancel'],
                        ],
                    ].map(prop => (
                        <Grid.Column width={2} key={prop[2]}>
                            <Button fluid color={prop[0]} onClick={prop[1]}>
                                {prop[2]}
                            </Button>
                        </Grid.Column>
                    ))}
                </Grid.Row>
                <Grid.Row
                    style={{
                        marginTop: 14,
                        overflow: 'scroll',
                        width: '100%',
                        height: 800,
                        padding: 5,
                    }}
                >
                    <Grid.Column width={8}>
                        <List
                            comments={comments}
                            messages={messages}
                            replyTo={state.reply.id}
                            reply={(initialText, id) =>
                                setState({
                                    ...state,
                                    reply: {
                                        ...state.reply,
                                        id: id,
                                        text: initialText,
                                    },
                                    initialText: initialText,
                                })
                            }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default injectIntl(Comment);
