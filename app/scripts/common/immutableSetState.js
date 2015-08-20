export default function(context, transform) {
  context.setState(({data}) => {
    return {data: transform(data)};
  });
}
