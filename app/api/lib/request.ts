type JsonParseResult = { payload: unknown } | { error: Response };

export async function parseJsonBody(request: Request): Promise<JsonParseResult> {
  try {
    const payload = await request.json();
    return { payload };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        error: Response.json(
          { error: "Malformed JSON body.", details: error.message },
          { status: 400 }
        ),
      };
    }
    throw error;
  }
}
