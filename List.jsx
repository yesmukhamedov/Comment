import React from 'react';
import { Icon, Image, Segment, Grid } from 'semantic-ui-react';

function List({ comments, reply, replyTo, messages }) {
    const [visible, setVisible] = React.useState([]);
    // By nature "visible" should take a boolean, but in these cases the bean should have taken a comment object not an array of objects. If you could come up with an algorithm that, given an array, can display each comment separately without separating the component, rewrite this code
    const card = comment => (
        <div
            style={{
                marginTop: 14,
                paddingLeft: 14,
                display: 'flex',
                width: '100%',
            }}
        >
            <Image
                src={
                    'https://w7.pngwing.com/pngs/634/658/png-transparent-computer-icons-avatar-user-avatar-heroes-black-user-thumbnail.png'
                }
                style={{ width: 50, height: 50, marginRight: 14 }}
                alt={'avatar'}
            />
            <div style={{ width: '100%' }}>
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6} style={{ paddingLeft: 0 }}>
                                <b>{comment.staffName}</b>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <span style={{ color: 'teal' }}>
                                    {comment.createdAt}
                                </span>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <div>{comment.comment}</div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <a
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            setVisible(
                                visible.includes(comment.id)
                                    ? visible.filter(
                                          item => comment.id !== item,
                                      )
                                    : [...visible, comment.id],
                            )
                        }
                    >
                        <Icon
                            name={
                                visible.includes(comment.id)
                                    ? 'angle up'
                                    : 'angle down'
                            }
                        />
                        {visible.includes(comment.id)
                            ? messages['hideAnswers']
                            : `${messages['showAnswers']} (${comment.childs.length})`}
                    </a>
                    <a
                        style={{ marginRight: 50, cursor: 'pointer' }}
                        onClick={() =>
                            comment.id === replyTo
                                ? reply('', 0)
                                : reply(`${comment.staffName}, `, comment.id)
                        }
                    >
                        <Icon name={'share'} />
                        {comment.id === replyTo
                            ? messages['BTN__CANCEL']
                            : messages['answer']}
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        comments &&
        comments.map(comment => (
            <div key={comment.id}>
                {comment.id === replyTo ? (
                    <Segment style={{ padding: 0, paddingBottom: 14 }}>
                        {card(comment)}
                    </Segment>
                ) : (
                    card(comment)
                )}
                {visible.includes(comment.id) && (
                    <div
                        style={{
                            marginLeft: 30,
                            marginRight: -30,
                            width: '100%',
                        }}
                    >
                        {comment.childs.length ? (
                            <List
                                comments={comment.childs}
                                reply={reply}
                                replyTo={replyTo}
                                messages={messages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        ))
    );
}

export default List;
