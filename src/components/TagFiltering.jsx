import { Container, Row, Button, Stack } from 'react-bootstrap';

import TextField from './Textfield';
import AppAlert from './AppAlert';

function TagFiltering({ tag, tagHandler, tags, tagsHandler, 
    tagWarning, tagWarningHander, clearTagsHandler }) {
  return (
    <>
      <Container>
        <Row>
            <TextField
                id="code-tags"
                label="Tags:"
                value={tag}
                onChange={tagHandler}
                placeholder="Enter tags for code snippet "
                addText="ex. fundamentals, framework, algorithms"
            />
        </Row>
        {tagWarning && (
            <AppAlert 
                alertTitle=""
                alertVariant="warning" 
                alertContent="⚠️ Only a maximum of 4 tags are allowed"
                hasButton={false}s
                buttonText=""
                showAlert={tagWarning}
                setShowAlert={tagWarningHander}
            />
        )}
        <Button className="m-2" variant="outline-light" onClick={tagsHandler}>
            + Add Tag
        </Button>
        <Button className="m-3" variant="outline-danger" onClick={clearTagsHandler}>
            Reset Tags
        </Button>
        <Stack className="m-2" direction="horizontal" gap={2}>
            {tags.map((tag) => (
                <AppBadge 
                    bgColor="light" 
                    txtColor="dark" 
                    text={tag}
                />
            ))}
        </Stack>
      </Container>
    </>
  )
}

export default TagFiltering
