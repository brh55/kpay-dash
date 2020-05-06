function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      />
    <TextInput
        label="K-Pay API Key"
        value={{ name: props.settingsStorage.getItem('apiKey') || '' }}
        onChange={(value) => {
          props.settingsStorage.setItem('apiKey', value.name);
        }}
      />
    </Page>
  );
}

registerSettingsPage(settingsComponent);
